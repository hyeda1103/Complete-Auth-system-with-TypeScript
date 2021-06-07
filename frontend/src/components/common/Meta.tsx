import React from 'react'
import { Helmet } from 'react-helmet'

interface IProps {
    title?: string
    description?: string
    keywords?: string
}

const Meta = ({ title, description, keywords }: IProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: '우아한 글쓰기',
  description: '우아한 글쓰기',
  keyword: '우아한 형제들, 우아한 글쓰기, 우아한 테크러닝, 4기',
}

export default Meta
