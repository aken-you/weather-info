const fetcher = async <DataType>({ url, method, options }: { url: string; method: string; options: RequestInit }) => {
  const response = await fetch(url, {
    method,
    ...options,
  })

  const data: DataType = await response.json()

  return data
}

export const http = {
  get: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>({ url, method: 'GET', options }),
  post: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>({ url, method: 'POST', options }),
  delete: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>({ url, method: 'DELETE', options }),
  put: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>({ url, method: 'PUT', options }),
  patch: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>({ url, method: 'PATCH', options }),
}
