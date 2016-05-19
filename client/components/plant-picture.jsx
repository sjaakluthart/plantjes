import React from 'react';
import $ from 'jquery';

import { FloatingActionButton, Paper } from 'material-ui';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';

class PlantPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      uploadedFile: ''
    };
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile(event) {
    const formData = new FormData();
    formData.append('file', event.currentTarget.files[0]);
    formData.append('plantId', this.props.plantId);

    $.ajax({
      method: 'POST',
      url: '/uploadImage',
      data: formData,
      processData: false,
      contentType: false
    })
    .then((data) => {
      this.setState({
        uploadedFile: data
      });
    });
  }

  renderPlantPicture() {
    let image;

    // If the user has just uploaded an image, show that image.
    if (this.state.uploadedFile) {
      image = <img src={`/uploads/${this.state.uploadedFile}`} alt="uploaded file" />;
    } else if (this.props.plantPicture) {
      image = <img src={`/uploads/${this.props.plantPicture}`} alt="uploaded file" />;
    } else {
      image = <img src="/assets/placeholder.svg" alt="placeholder" />;
    }

    return image;
  }

  render() {
    return (
      <section className="plant-picture">
        <Paper>
          {this.renderPlantPicture()}
        </Paper>
        <form encType="multipart/form-data">
          <FloatingActionButton mini>
            <ImageAddAPhoto />
          </FloatingActionButton>
          <input onChange={this.uploadFile} type="file" name="file" />
        </form>
      </section>
    );
  }
}

PlantPicture.propTypes = {
  plantId: React.PropTypes.string.isRequired,
  plantPicture: React.PropTypes.string
};

export default PlantPicture;
