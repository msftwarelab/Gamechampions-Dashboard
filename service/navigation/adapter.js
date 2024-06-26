export const toNavigation = data => {
  if (data) {
    let response = {};
    response.id = data.id;
    response.name = data.name;
    response.title = data.title;
    response.icon = data.icon ? `${data.icon.imageUrl}` : null;
    response.iconDesktop = data.iconDesktop
      ? `${data.iconDesktop.imageUrl}`
      : null;
    response.url = data.url;
    response.isActive = data.isActive || false;
    response.children = [];
    if (data.children && data.children.length > 0) {
      // Using forEach instead of the faster for loop to avoid ordering the navigation
      // menu backwards
      data.children.forEach(child => {
        response.children.push(toNavigation(child));
      });
    }
    return response;
  }
};
