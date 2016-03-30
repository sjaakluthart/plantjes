import React from 'react'
import $ from 'jquery'

const PlantPicture = React.createClass({
  displayName: 'PlantPicture',

  propTypes: {
    plantId: React.PropTypes.string.isRequired,
    plantPicture: React.PropTypes.string
  },

  getInitialState() {
    return {
      file: '',
      uploadedFile: ''
    }
  },

  uploadFile(event) {
    let formData = new FormData();
    formData.append('file', event.currentTarget.files[0]);
    formData.append('plantId', this.props.plantId);

    $.ajax({
      method: 'POST',
      url: '/upload',
      data: formData,
      processData: false,
      contentType: false
    })
    .then((data) => {
      this.setState({
        uploadedFile: data
      });
    });
  },

  renderPlantPicture() {
    let src;

    // If the user has just uploaded an image, show that image.
    if (this.state.uploadedFile) {
      src = `uploads/${this.state.uploadedFile}`;
      return <img src={src} />
    } else if (this.props.plantPicture) {
      src = `uploads/${this.props.plantPicture}`;
      return <img src={src} />
    } else {
      return <img src="assets/placeholder.svg" />
    }

  },

  render() {
    return (
      <section className="plant-picture">
        {this.renderPlantPicture()}
        <form encType="multipart/form-data">
          <img src="assets/camera.svg" />
          <input onChange={this.uploadFile} type="file" name="file" />
      </form>
      </section>
    )
  }
});

export {PlantPicture}
