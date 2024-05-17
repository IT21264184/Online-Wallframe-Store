import http from "./httpService";

const endpoint = "/api/v1/payment";

export async function getAllUserPayments(id) {
  return await http.get(endpoint + `/getPayments/${id}`);
}
export async function getAllPayments(id) {
  return await http.get(endpoint + "/getAllPayments");
}

export async function createNewPayment(payment) {
  const data = {
    userId: payment.userId,
    items: payment.items,
  };

  return await http.post(endpoint + "/newPayment", data);
}
