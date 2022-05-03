module.exports = {
  async redirects() {
    return [
      {
        source: '/pages/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/trophies.html',
        destination: '/reports',
        permanent: true,
      },
      {
        source: '/pages/certs.html',
        destination: '/certs',
        permanent: true,
      },
    ];
  },
};
