import axios from "axios";

class HttpHelper {
  constructor() {
    this.config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
  /**
   *
   * @param {*} url
   * @param {*} data
   * @param {*} config
   */
  static async post(url, data, config) {
    if (!url) return Promise.reject("Url is required");
    if (!data) return Promise.reject("Data is required");
    this.config = config ? config : this.config;
    try {
      return await axios.post(url, data, this.config);
    } catch (error) {
      // TODO: Need to manage error in error log file;
      console.log("error: ", JSON.stringify(error));
      throw error;
    }
  }
  static async request(config) {
    // Need to implement
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  static async get(url, config) {
    if (!url) return Promise.reject("Url is required");
    this.config = config ? config : this.config;
    try {
      return await axios.get(url, this.config);
    } catch (error) {
      // TODO: Need to manage error in error log file;
      console.log("error: ", JSON.stringify(error));
      throw error;
    }
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  static async delete(url, config) {
    if (!url) return Promise.reject("Url is required");
    this.config = config ? config : this.config;
    try {
      return await axios.delete(url, this.config);
    } catch (error) {
      // TODO: Need to manage error in error log file;
      console.log("error: ", JSON.stringify(error));
      throw error;
    }
  }
  /**
   *
   * @param {} url
   * @param {*} data
   * @param {*} config
   */
  static async put(url, data, config) {
    if (!url) return Promise.reject("Url is required");
    if (!data) return Promise.reject("Data is required");
    this.config = config ? config : this.config;
    try {
      return await axios.put(url, data, this.config);
    } catch (error) {
      // TODO: Need to manage error in error log file;
      console.log("error: ", JSON.stringify(error));
      throw error;
    }
  }

  static async patch(url, data, config) {
    // need to implement
  }
}

export default HttpHelper;
