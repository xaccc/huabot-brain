var DEMO = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },


  predict (img_url) {
    var self = this;
    jQuery.post('/api/predict', {img_url: img_url},
                data => self.setState(data)).fail(() =>
      alert("Error: please make sure the predict worker is started.")
    );

  },

  getInitialState () {
    this.cache = {};
    var query = this.context.router.getCurrentQuery();
    var img_url = query.img_url || '';
    return {bet_result: [], time: null, err: null};
  },

  componentDidMount () {
    this.componentDidUpdate();
  },

  componentDidUpdate () {
    var query = this.context.router.getCurrentQuery();
    if (query.img_url && query.img_url !== this.cache.imgUrl) {
      this.cache.imgUrl = query.img_url;
      this.predict(this.cache.imgUrl);
    }
  },

  handleSubmit (evt) {
    evt.preventDefault();
    var imgUrl = this.refs.imgUrl.getValue();
    if (imgUrl === this.cache.imgUrl) {
      return;
    }
    this.cache.imgUrl = imgUrl;
    this.predict(imgUrl);
    var href = this.context.router.makeHref('demo', {}, {img_url: imgUrl});
    window.location.href = href;
  },

  renderResult () {
    if (!this.state.bet_result || this.state.bet_result.length === 0) {
      return;
    }

    var elems = this.state.bet_result.map(result => {
      var tag = result.tag;
      return (
        <tr key={tag.tag_id}>
          <td>{tag.tag_id}</td>
          <td><Link to="datasets" params={{dataType: 'all'}} query={{tag: tag.name}}>{tag.name}</Link></td>
          <td>{result.score}</td>
        </tr>
      );
    });

    var image;
    if (this.cache.imgUrl) {
      image = <img src={"/api/proxy?url=" + this.cache.imgUrl} />;
    }

    var time = 'loading...';
    if (this.state.time) {
      time = this.state.time + ' s';
    }


    return (
      <Row className="result">
        <Col xs={6}>
          {image}
        </Col>
        <Col xs={6}>
          <Panel> Spend time: {time} </Panel>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tag</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {elems}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  },

  render () {
    return (
      <div className="dashboard demo">
        <Panel>
          <h4>Enter an image url then predict tags.</h4>
          <form onSubmit={this.handleSubmit}>
            <Input type="url" name="img_url" ref="imgUrl" />
          </form>
        </Panel>
        <Alert bsStyle="warning">
          <p>This is a demo for predict image's tags use the pretrained model and the predict worker.</p>
        </Alert>
        {this.renderResult()}
      </div>
    );
  }
});

