import React from "react"
import { graphql } from "gatsby"
import IntroVideo from "../assets/homepageVideo.mp4"
import IntroVideoPreviewImage from "../assets/homepageVideoPreviewImage.jpg"
import {
  Instagram,
  Facebook,
  Spotify,
  Youtube,
  Amazon,
  SoundCloud,
} from "../icons"
import { useSetViewportCssVars } from "./useSetViewportCssVars"

import "./reset.css"
import "./site.css"

const Post = ({ post }) => (
  <article className="card ">
    <h2 className="post-title">{post.frontmatter.title}</h2>
    {post.frontmatter.thumbnail && (
      <img
        src={post.frontmatter.thumbnail}
        alt={post.frontmatter.title + "- Featured Shot"}
        width="200px"
      />
    )}
    <div className="post-meta">{post.frontmatter.date}</div>
    <div className="post-meta">{post.excerpt}</div>
  </article>
)

function SocialIcons(params) {
  return (
    <ul className="social-icons">
      <li>
        <a href="https://www.facebook.com/therapports/">
          <Facebook width="1.5rem" />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/therapports/">
          <Instagram width="1.5rem" />
        </a>
      </li>
      <li>
        <a href="https://www.youtube.com/channel/UCDUavfXgJ6pCaS-KgrjVxig">
          <Youtube width="1.5rem" />
        </a>
      </li>
      <li>
        <a href="https://open.spotify.com/album/6Q74wQiIvhluVWh7PfJIxr?si=2diemmM-Tdqx2al0ZH79Pw">
          <Spotify width="1.5rem" />
        </a>
      </li>
      <li>
        <a href="https://www.amazon.co.uk/Come-Home-Rapports/dp/B0719N9ZQB">
          <Amazon width="1.5rem" />
        </a>
      </li>
      <li>
        <a href="https://soundcloud.com/therapports">
          <SoundCloud width="1.5rem" />
        </a>
      </li>
    </ul>
  )
}
const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  useSetViewportCssVars()

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <Post key={edge.node.id} post={edge.node} />)

  return (
    <div>
      <div className="hero-section">
        <video
          className="homepage-video"
          muted
          autoPlay
          src={IntroVideo}
          type="video/mp4"
        >
          <p>Your browser does not support the video element.</p>
        </video>
        <div>
          <SocialIcons />
        </div>
      </div>

      <div className="news-section">
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
