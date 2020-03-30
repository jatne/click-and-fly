class Images {
  constructor(endpoint, token, canvas) {
    this.endpoint = endpoint;
    this.token = token;
    this.canvas = canvas;

    this.entriesPromise = fetch(`${this.endpoint}?token=${this.token}`)
      .then(response => response.json())
      .then(data => data.entries);
  }
}

export default Images;
