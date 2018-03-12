import React from 'react';
import {connect} from 'react-redux';
import {GalleryItem} from './';
import {updatePhotoRequest, deletePhotoRequest} from '../../actions';

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      photos: this.props.photos,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({photos: nextProps.photos});
  }

  render(){
    return (
      <section className="galley-container">
        <ul className="gallery-list" >
          {this.state.photos.length ?
            this.state.photos.map(photo => 
              <GalleryItem 
                key={photo._id} 
                photo={photo}
                onComplete={this.props.onComplete} />
            )
            :
            undefined
          }
        </ul>
      </section>
    );
  }

}

const mapPropsToState = state => ({
  photos: state.photos,
});

const mapDispatchToProps = dispatch => ({
  onComplete: {
    delete_photo: photo => dispatch(deletePhotoRequest(photo)),
    update:  photo => dispatch(updatePhotoRequest(photo)),
  },
});

export default connect(mapPropsToState, mapDispatchToProps)(Gallery);
