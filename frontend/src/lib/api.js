async function fetcher(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.error || "An error occurred during the request.");
  }
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return { message: "Success" };
  }
  return response.json();
}

export default fetcher;
