const status = (request, response) => {
  response.status(200).json({key: "Api test"});
}

export default status;
