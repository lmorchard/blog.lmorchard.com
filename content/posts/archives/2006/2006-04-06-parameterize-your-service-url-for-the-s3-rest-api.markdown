---
comments_archived: true
date: '2006-04-06T09:59:29-04:00'
layout: post
tags:
- asides
title: Parameterize your service URL for the S3 REST API
wordpress_id: 926
wordpress_slug: parameterize-your-service-url-for-the-s3-rest-api
wordpress_url: http://decafbad.com/blog/2006/04/06/parameterize-your-service-url-for-the-s3-rest-api
---
 <p>One more rapid fire thought on Amazon S3:  If you're building an app that talks to the S3 REST API, please parameterize the base URL used to access the service.  Make it a config file parameter or a control panel setting or whatever.  This API will be cloned.</p>
 <p>And an issue related to that:  Say you find that the base URL to an S3 clone is <a href="http://example.com/foo/myS3/service.php">http://example.com/foo/myS3/service.php</a> - this path shouldn't be included in the resource path.  That is, accessing key "/bar/baz" in bucket "/foo" should not result in a resource path of /foo/myS3/service.php/foo/bar/baz.  Instead it should simply be /foo/bar/baz.  This is important for the authentication scheme when used in a clone.</p>
