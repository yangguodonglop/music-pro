import Vue from 'vue'

import VueRouter from 'vue-router'



Vue.use(VueRouter)
// const RouteView = {
//     name: 'RouteView',
//     render: (h) => h('router-view')
//   }
//   alert(localStorage.getItem("admin"))



var routes = [
    {
    path: '/',
    component: () => import('@/views/Login/index'),
    name: 'Login',
    hiddren:true,
},
{
    path: '/Home',
    component: () => import('@/views/Home/index'),
  //  redirect: '/Authority/base',
    name: '权限设置',
    meta:{
        title:"设置",
        requireAuth:true,
        index:11
      },
   
    children:[
        {
            path: '/Authority/UserList',
            component: () => import('@/views/Authority/UserList'),
            name: '账号列表',
            meta:{
                title:"设置",
                requireAuth:true,
                index:1
              }
        }, 
    ]
},
{
  path: '/Home1',
  component: () => import('@/views/Home/index'),
//  redirect: '/Authority/base1',
  name: '歌曲设置',
  meta:{
      title:"设置",
      requireAuth:true,
      index:11
    },
 
  children:[
      {
          path: '/Music/UserList',
          component: () => import('@/views/Music/MusicList'),
          name: '歌曲列表',
          meta:{
              title:"设置",
              requireAuth:true,
              index:3
            }
      }, 
      {
        path: '/Music/UserList1',
        component: () => import('@/views/Music/MusicRelease'),
        name: '发布列表',
        meta:{
            title:"设置",
            requireAuth:true,
            index:4
          }
    }, 
  ]
}
    ,
{
    path: "*",
    redirect: "/",
    hiddren:true,
   
}
]


var router = new VueRouter({
    routes: routes
})
router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('admin');
    if(to.path!='/' && !token){
      next({path: '/'})
    } else {  
      if(to.path =='/' && token){
        next('/Authority/UserList')
       // let  auditRoute =ww
      }else{
        next()
       }
      }
  })

export default router;