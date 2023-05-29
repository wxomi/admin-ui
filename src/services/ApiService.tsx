class ApiService {
  static getMembers() {
    return fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .catch(() => {
        throw new Error("Failed to fetch members");
      });
  }
}

export default ApiService;
