
/**
 * @fileoverview Tests for Cache.
 * @author Kai Cataldo
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("chai").assert,
    Cache = require("../../../lib/util/cache");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("Cache", () => {
    const collection = "collection name";
    const key = { key: true };
    const key2 = { key2: true };
    const val = "value";
    let cache;

    beforeEach(() => {
        cache = new Cache();
    });

    describe("set", () => {
        it("should create a new collection when it does not already exist and set a value", () => {
            assert(typeof cache[collection] === "undefined");
            cache.set(collection, key, val);
            assert(cache[collection] instanceof WeakMap);
            assert(cache.get(collection, key), val);
        });

        it("should set a value for a collection that already exists", () => {
            const val2 = "value2";

            cache.set(collection, key, val);
            cache.set(collection, key2, val2);
            assert(cache.get(collection, key2), val2);
        });
    });

    describe("get", () => {
        it("should get a value for the given collection", () => {
            cache.set(collection, key, val);
            assert(cache.get(collection, key), val);
        });

        it("should return undefined if collection doesn't exist", () => {
            assert(typeof cache.get(collection, key) === "undefined");
        });
    });

    describe("has", () => {
        it("should return true if the specified collection has the given key", () => {
            cache.set(collection, key, val);
            assert(cache.has(collection, key));
        });

        it("should return false if the specified collection does not have the given key", () => {
            cache.set(collection, key, val);
            assert(!cache.has(collection, key2));
        });

        it("should return false if the specified collection does not exist", () => {
            assert(!cache.has(collection, key));
        });
    });
});
