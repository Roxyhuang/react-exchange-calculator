/* eslint-disable */
const productClient = {
  async getProductList(data) {
    return await this._fetch({ url: '/api',method: data.method, body: data.body });
  },
};
export default productClient;
