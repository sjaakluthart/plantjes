import React from 'react';
import $ from 'jquery';

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
    };
  },

  uploadFile(event) {
    const formData = new FormData();
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
    let image;

    // If the user has just uploaded an image, show that image.
    if (this.state.uploadedFile) {
      image = <img src={`uploads/${this.state.uploadedFile}`} />;
    } else if (this.props.plantPicture) {
      image = <img src={`uploads/${this.props.plantPicture}`} />;
    } else {
      image = <img src="assets/placeholder.svg" />;
    }

    return image;
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
    );
  }
});

export default PlantPicture;
