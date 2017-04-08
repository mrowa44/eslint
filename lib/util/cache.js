/**
 * @fileoverview Cache object that manages multiple namespaced collections of data.
 * @author Kai Cataldo
 */

"use strict";

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Cache
 *
 * A cache object that manages multiple namespaced collections of data.
 * Each namespaced collection is a WeakMap instance.
 * The cache will lazily create a new cache for the specified collection namespace the first
 * time set() is called with a new collection type.
 */
module.exports = class Cache {

    /**
     * Sets a value in the cache of the given collection.
     * @param {string} collection A string representing the collection of cache to generate or set to.
     * @param {Object} key The key to set.
     * @param {*} val val The value to set.
     * @returns {Object} The cache WeakMap object.
     * @public
     */
    set(collection, key, val) {
        if (!this[collection]) {
            this[collection] = new WeakMap();
        }

        return this[collection].set(key, val);
    }

    /**
     * Gets a value in the cache of the given collection.
     * @param {string} collection A string representing the collection of cache to get from.
     * @param {Object} key The key to get.
     * @returns {*|void} Either the set value or undefined.
     * @public
     */
    get(collection, key) {
        if (!this[collection]) {
            return void 0;
        }

        return this[collection].get(key);
    }

    /**
     * Checks to see if a key is set in the cache of the given collection.
     * @param {string} collection A string representing the collection of cache to check for the given key.
     * @param {Object} key The key to get.
     * @returns {boolean} Whether or not the cache has the given key.
     * @public
     */
    has(collection, key) {
        return this[collection] && this[collection].has(key);
    }
};
