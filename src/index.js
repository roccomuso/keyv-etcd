'use strict';

const EventEmitter = require('events').EventEmitter;
const Etcd = require('node-etcd');
const pify = require('pify');

class KeyvEtcd extends EventEmitter {
	constructor(uri, opts) {
		super();
		this.ttlSupport = true;
		opts = Object.assign({}, { timeout: 4000 }, opts)

		uri = uri || '127.0.0.1:2379'
		if (typeof uri === 'object') {
			uri = uri.uri
		}
		if (opts.uri) {
			uri = opts.uri
			delete otps.uri
		}

		let uriCheck = new RegExp(/^etcd:\/\//)
		uri = Array.isArray(uri) ? uri.map((x) => {
			return x.replace(uriCheck, '')
		}) : uri.replace(uriCheck, '')

		const client = new Etcd(uri, opts);

		this.etcd = ['set', 'get', 'del', 'mkdir', 'rmdir'].reduce((obj, method) => {
			obj[method] = pify(client[method].bind(client));
			return obj;
		}, {});

		process.nextTick(() => {
			this.etcd.mkdir(this.namespace)
			.catch((err) => {
				if (err.errorCode !== 102) {
					this.emit('error', err)
				}
			})
		})

	}

	get(key) {
		return this.etcd.get(`${this.namespace}/${key}`)
				.then(({node}) => {
					if (node.dir) {
						return undefined;
					}
					return node.value;
				}).catch((err)=>{
					if (err.name === 'ReferenceError') return undefined
					if (err.errorCode === 100) return undefined
					return err
				});

	}

	set(key, value, ttl) {
		if (typeof value === 'undefined') {
			return Promise.resolve(undefined);
		}
		return Promise.resolve()
			.then(() => {
				if (typeof ttl === 'number') {
					return this.etcd.set(`${this.namespace}/${key}`, value, ttl).then(()=>true).catch(()=>false);
				}
				return this.etcd.set(`${this.namespace}/${key}`, value).then(()=>true).catch(()=>false);
			})
	}

	delete(key) {
		return this.etcd.del(`${this.namespace}/${key}`)
			.then(() => true)
			.catch(() => false);
	}

	clear() {
		return this.etcd.rmdir(this.namespace, { recursive: true })
			.then(() => undefined)
			.catch(() => undefined);
	}
}

module.exports = KeyvEtcd;