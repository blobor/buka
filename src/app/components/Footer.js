import React from 'react'

const Footer = ({ name, version }) => {
  const json = JSON.stringify({
    name,
    version
  })

  return (
    <footer className='buka__footer app-info'>
      <pre className='app-info__json'>{json}</pre>
      <a className='app-info__github' href='https://github.com/blobor/buka'>💚 GitHub</a>
    </footer>
  )
}

export default Footer
