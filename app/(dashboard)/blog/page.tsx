//import node modules libraries
import { Fragment } from "react";
import { Metadata } from "next";

//import custom components
import BlogList from "components/blog/BlogList";
import BlogListHeader from "components/blog/BlogListHeader";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const Blog = () => {
  return (
    <Fragment>
      <BlogListHeader />
      <BlogList />
    </Fragment>
  );
};

export default Blog;
