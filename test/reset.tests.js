describe('reset', function () {
  afterEach(function () {
    $('#a0-widget').remove();
    global.window.location.hash = '';
    global.window.Auth0 = null;
  });

  beforeEach(function () {
    $('#a0-widget').parents('div').remove();
    this.auth0 = new Auth0Widget({
      domain:      'mdocs.auth0.com',
      callbackURL: 'http://localhost:3000/',
      clientID:    '0HP71GSd6PuoRYJ3DXKdiXCUUdGmBbup',
      rememberLastLogin: false
    });
  });

  it('should show the loading pane', function (done) {
    var auth0 = this.auth0

    auth0
    .once('signin ready', function () {
      bean.fire($('#a0-widget .a0-forgot-pass')[0], 'click');
    })
    .once('reset ready', function () {
      $('#a0-reset_easy_email').val('ohmy@mandatory.com');
      $('#a0-reset_easy_password').val('123');
      $('#a0-reset_easy_repeat_password').val('123');

      auth0
      .once('loading ready', function () {
        expect($('#a0-widget h1').html()).to.be(auth0.options.i18n.t('reset:title'));
        done();
      });

      bean.fire($('.a0-reset form')[0], 'submit');
    })
    .show();
  });

});
