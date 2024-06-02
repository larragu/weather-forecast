class HttpClient {
  static async get<T>(url: string, options?: any): Promise<T> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("HTTP Server Error");
    }
  }
}

export default HttpClient;
