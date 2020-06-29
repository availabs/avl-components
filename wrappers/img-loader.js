import React from "react"

export default (Component, options = {}) => {
  return class Wrapper extends React.Component {
    state = {
      loading: false,
      message: ""
    }
    uploadImage(file, uploadUrl) {
      if (!file) return Promise.resolve(null);
      if (!/^image[/]/.test(file.type)) {
        this.setState({ message: "File was not an image." });
        return Promise.resolve(null);
      }

      this.setState({ message: "", loading: true });

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      this.setState({ loading: true });
      return new Promise(resolve => {
        reader.addEventListener("load", () => {
          fetch(uploadUrl, {
            method: "POST",
            body: reader.result,
            headers: {
              "Content-Type": "application/octet-stream",
              "Authorization": window.localStorage.getItem("userToken")
            }
          })
          .then(res => {
            if (!res.ok) {
              resolve({ url: null });
            }
            return res.json();
          })
          .then(resolve);
        })
      })
      .then(({ url }) => {
        this.setState({ loading: false });
        return url;
      })
    }
    processImage(src, processUrl) {
      if (!processUrl) return Promise.resolve(null);

      this.setState({ loading: true });
      return new Promise(resolve => {
        fetch(processUrl, {
          method: "POST",
          body: JSON.stringify({ src: encodeURI(src) }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("userToken")
          }
        })
        .then(res => {
          if (!res.ok) {
            resolve({ url: null });
          }
          return res.json();
        })
        .then(resolve);
      })
      .then(({ url }) => {
        this.setState({ loading: false });
        return url;
      })
    }
    render() {
      return (
        <Component { ...this.props } { ...this.state }
          uploadImage={ (...args) => this.uploadImage(...args) }
          processImage={ (...args) => this.processImage(...args) }
          removeImage={ e => this.removeImage(e) }/>
      )
    }
  }
}
