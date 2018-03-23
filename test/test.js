import test from 'ava';
import keyvTestSuite, { keyvOfficialTests } from '@keyv/test-suite';
import Keyv from 'keyv';
import KeyvEtcd from 'this';

keyvOfficialTests(test, Keyv, 'etcd://127.0.0.1:2379', 'etcd://127.0.0.1:9999');

const store = () => new KeyvEtcd();
keyvTestSuite(test, Keyv, store);
