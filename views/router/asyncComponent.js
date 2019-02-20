import React from 'react'

export default (loadComponent, placeholder="加载中...") => {
    return class AsyncComponnt extends React.Component{
        constructor(){
            super()
            this.unmount = false
            this.state = {
                Child: null
            }
        }

        async componentDidMount(){
            const {default: Child} = await loadComponent();

            if(this.unmount) return

            this.setState({
                Child
            })
        }

        componentWillUnmount() {
            this.unmount = true
        }

        render() {
            const { Child } = this.state
            return (
                Child ? <Child {...this.props}/> : placeholder
            )
        }
    }
}

