module.exports = function() {
  return {
    name: 'add-date-to-sidebar',
    async contentLoaded({content, actions}) {
      // This plugin doesn't need to do anything here
    },
    getClientModules() {
      return [require.resolve('./addDateToSidebarClient.js')];
    },
  };
};