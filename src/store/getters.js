const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  id: state => state.user.id,
  name: state => state.user.name,
  roles: state => state.user.roles,
  role: state => state.user.role,
  mob: state => state.user.mob,
  unitName: state => state.user.unitName,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
}

export default getters
