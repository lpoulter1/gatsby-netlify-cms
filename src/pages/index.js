import React from "react"
import { graphql } from "gatsby"
import IntroVideo from "../assets/homepageVideo.mp4"
import "./reset.css"
import "./site.css"

const Post = ({ post }) => (
  <article className="card ">
    <img
      src={post.frontmatter.thumbnail}
      alt={post.frontmatter.title + "- Featured Shot"}
      width="200px"
    />
    <header>
      <h2 className="post-title">{post.frontmatter.title}</h2>
      <div className="post-meta">{post.frontmatter.date}</div>
      <div className="post-meta">{post.frontmatter.html}</div>
    </header>
  </article>
)

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <Post key={edge.node.id} post={edge.node} />)

  return (
    <div>
      <div className="hero-section">
        <video
          className="homepage-video"
          muted
          loop
          autoPlay
          src={IntroVideo}
          type="video/mp4"
        >
          <p>Your browser does not support the video element.</p>
        </video>
      </div>

      <div className="news-section">
        <h2>News</h2>
        <div className="news-posts">{Posts}</div>
      </div>
    </div>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    markdownRemark {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            thumbnail
            title
          }
        }
      }
    }
  }
`
