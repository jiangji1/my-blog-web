import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
const { lazy, Suspense } = React
const { Switch, Route, Redirect } = ReactRouter
const pathArr = [
  '/home',
  '/edit',
  '/login',
]
// console.log(ReactRouter)

class Index extends React.Component {
  render () {
    return <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {
        React.Children.map(pathArr, (path, i) => {
          return (
            <Route key={i} path={path} component={lazy(() => import(`.${path}`))} />
          )
        })
      }
      {/* <Redirect to="/login" /> */}
      <Redirect to="/home" />
    </Switch>
    </Suspense>
  }
}

// export default withRouter(Index)
export default Index