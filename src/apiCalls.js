const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
  .then(response => response.json())
  .catch(error => alert('Server is not responsive'))
}

const getAllData = (customer, room, booking) => {
  const result = Promise.all([fetchData(customer), fetchData(room), fetchData(booking)])
    .then(responses => {
      return responses
    })
    return result
}

export { getAllData }