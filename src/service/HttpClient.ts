class HttpClient {
  static async get<T>(url: string, options?: any): Promise<T> {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  }
}

export default HttpClient;
