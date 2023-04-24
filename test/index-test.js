/* eslint-env mocha */
'use strict';

const addonIndex = require('../index');
// eslint-disable-next-line n/no-unpublished-require
const expect = require('chai').expect;

describe('index', function () {
  describe('#exclusionFilter', function () {
    it('should return `true` if a file is in the blacklist', function () {
      const name = 'range';
      const dummyRegex = new RegExp('.*');
      const lists = {
        blacklist: ['range', 'inc'],
      };
      const result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.true;
    });

    it('should return `false` if a file is not in the blacklist', function () {
      const name = 'pipe';
      const dummyRegex = new RegExp('.*');
      const lists = {
        blacklist: ['range', 'inc'],
      };
      const result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });

    it('should return `false` if a file is in the whitelist', function () {
      const name = 'range';
      const dummyRegex = new RegExp('.*');
      const lists = {
        whitelist: ['range', 'inc'],
      };
      const result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });

    it('should return `true` if a file is not in the whitelist', function () {
      const name = 'range';
      const dummyRegex = new RegExp('.*');
      const lists = {
        whitelist: ['inc'],
      };
      const result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.true;
    });

    it('should return `false` if a file is in both the whitelist and blacklist', function () {
      const name = 'range';
      const dummyRegex = new RegExp('.*');
      const lists = {
        blacklist: ['range'],
        whitelist: ['range', 'inc'],
      };
      const result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });

    it('should return `false` if both lists are empty', function () {
      const name = 'range';
      const dummyRegex = new RegExp('.*');
      const lists = {};
      const result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });
  });

  describe('#generateWhitelist', function () {
    it('should return files to whitelist when both `only` and `expect` are defined', function () {
      const dummyConfig = {
        only: ['range', 'pipe', 'inc', 'dec'],
        except: ['inc'],
      };
      const expectedResult = ['range', 'pipe', 'dec'];
      const result = addonIndex.generateWhitelist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });

    it('should return files to whitelist when `only` is defined', function () {
      const dummyConfig = {
        only: ['range', 'pipe', 'inc', 'dec'],
      };
      const expectedResult = ['range', 'pipe', 'inc', 'dec'];
      const result = addonIndex.generateWhitelist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });
  });

  describe('#generateBlacklist', function () {
    it('should return files to blacklist when both `only` and `expect` are defined', function () {
      const dummyConfig = {
        only: ['range', 'pipe', 'inc', 'dec'],
        except: ['inc'],
      };
      const expectedResult = ['inc'];
      const result = addonIndex.generateBlacklist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });

    it('should return files to blacklist when `except` is defined', function () {
      const dummyConfig = {
        except: ['range', 'pipe', 'inc', 'dec'],
      };
      const expectedResult = ['range', 'pipe', 'inc', 'dec'];
      const result = addonIndex.generateBlacklist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });
  });
});
