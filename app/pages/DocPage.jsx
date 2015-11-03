import React from 'react';
import { baseUri } from '../constants/AppConstants';
import SidebarMenu from '../components/SidebarMenu.jsx';

let apiUri = baseUri + 'api';

class DocPage extends React.Component {
  componentDidMount() {
    $('#documentation').scrollspy({
      target: '.bs-docs.sidebar',
      offset: 40
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-2 col-md-2">
          <SidebarMenu/>
        </div>
        <div data-spy="scroll" id="documentation" className="col-lg-5 col-md-7 col-sm-9">
          <h1>Abita API Documentation</h1>
          <section id="datatypes">
            <h2>Data Types</h2>
            <div id="data-users">
              <h3>Users</h3>
              <table className="table table-bordered">
                <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Required</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>userId</td>
                  <td>int</td>
                  <td>yes</td>
                </tr>
                <tr>
                  <td>email</td>
                  <td>string</td>
                  <td>yes</td>
                </tr>
                <tr>
                  <td>dateCreated</td>
                  <td>string</td>
                  <td>yes</td>
                </tr>
                <tr>
                  <td>dateModified</td>
                  <td>string</td>
                  <td>yes</td>
                </tr>
                </tbody>
              </table>
            </div>

            <h3 id="data-pins">Pins</h3>
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>pinId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>userId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>pinType</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>caption</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>latitude</td>
                <td>double</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>double</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateCreated</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateModified</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              </tbody>
            </table>

            <h3 id="data-descriptions">Descriptions</h3>
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>descriptionId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>userId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>pinId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>text</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateCreated</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateModified</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              </tbody>
            </table>

            <h3 id="data-images">Images</h3>
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>imageId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>userId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>pinId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateCreated</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateModified</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              </tbody>
            </table>

            <h3 id="data-tags">Tags</h3>
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>tagId</td>
                <td>int</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>name</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateCreated</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              <tr>
                <td>dateModified</td>
                <td>string</td>
                <td>yes</td>
              </tr>
              </tbody>
            </table>
          </section>

          <h2 id="api">API Description</h2>

          <h3 id="api-users">Users</h3>

          <h4>Create a user</h4>
          <p><code>POST /users</code></p>
          <pre className="docs-example">{`curl -X POST ${apiUri}/users
{
  "email": "test@example.com",
}
`}
          </pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "userId": 47,
  "email": "test@example.com",
  "dateCreated": "2015-10-21T03:55:06.000Z",
  "dateModified": "2015-10-21T03:55:06.000Z"
}`}</code></pre>

          <h4>Get Users</h4>
          <code>GET /users</code>
          <pre className="docs-example">{`curl ${apiUri}/users/1`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
{
  "userId": 1,
  "email": "test@example.com",
  "dateCreated": "2015-10-21T03:55:06.000Z",
  "dateModified": "2015-10-21T03:55:06.000Z"
}`}</code></pre>

          <h4>Create a user star</h4>
          <code>{`PUT /users/{userId}/stars/{pinId}`}</code>
          <pre className="docs-example">{`curl -X PUT ${apiUri}/users/1/stars/1`}</pre>
          <pre className="prettyprint"><code className="javascript">204 No Content</code></pre>

          <h4>Unstar a pin</h4>
          <code>{`DELETE /users/{userId}/stars/{pinId}`}</code>
          <pre className="docs-example">{`curl -X DELETE ${apiUri}/users/1/stars/1`}</pre>
          <pre className="prettyprint"><code className="javascript">204 No Content</code></pre>

          <h4>Get a user's stars</h4>
          <code>{`GET /users/{userId}/stars`}</code>
          <pre className="docs-example">{`curl ${apiUri}/users/1/stars`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
[
  {
    "userId":1,
    "pinId":30,
    "dateCreated":"2015-10-22T21:42:37.000Z"
  },
  {
    "userId":1,
    "pinId":31,
    "dateCreated":"2015-10-22T21:42:42.000Z"
  }
]`}</code></pre>

          <h4>Create a visitation</h4>
          <code>{`PUT /users/{userId}/visits/{pinId}`}</code>
          <pre className="docs-example">{`curl -X PUT ${apiUri}/users/1/visits/1`}</pre>
          <pre className="prettyprint"><code className="javascript">204 No Content</code></pre>

          <h4>Get a user's visited pins</h4>
          <code>{`GET /users/{userId}/visits`}</code>
          <pre className="docs-example">{`curl ${apiUri}/users/1/visits`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
[
  {
    "userId":1,
    "pinId":31
  }
]`}</code></pre>
          <h4>Get a user's descriptions</h4>
          <code>{`GET /users/{userId}/descriptions`}</code>
          <pre className="docs-example">{`curl ${apiUri}/users/1/descriptions`}</pre>
          <pre className="prettyprint"><code className="javascript">204 No Content</code></pre>

          <h3 id="api-pins">Pins</h3>

          <h4>Create a pin</h4>
          <code>POST /pins</code>
          <pre className="docs-example">{`curl -X POST ${apiUri}/pins
{
  "userId": 1,
  "typeId": 1,
  "latitude": 0,
  "longitude": 0,
  "caption": "test caption"
}
`}
          </pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "pinId": 90,
  "userId": 1,
  "pinType": "Wildlife",
  "latitude": 0,
  "longitude": 0,
  "dateCreated": "2015-10-21T03:55:06.000Z",
  "dateModified": "2015-10-21T03:55:06.000Z",
  "caption": "test caption"
}`}</code></pre>

          <h4>Get a pin</h4>
          <code>{`GET /pins/{pinId}`}</code>
          <pre className="docs-example">{`curl ${apiUri}/pins/90`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
{
  "pinId": 90,
  "userId": 1,
  "pinType": "Wildlife",
  "latitude": 0,
  "longitude": 0,
  "dateCreated": "2015-10-21T03:55:06.000Z",
  "dateModified": "2015-10-21T03:55:06.000Z",
  "caption": "test caption"
}`}</code></pre>

          <h4>Update a pin</h4>
          <code>{`PUT /pins`}</code>
          <pre className="docs-example">{`curl -X PUT ${apiUri}/pins
{
  "pinId": 90,
  "userId": 1,
  "latitude": 10,
  "longitude": 10,
  "caption": "new caption"
}`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
{
  "pinId": 90,
  "userId": 1,
  "pinType": "Foliage",
  "latitude": 10,
  "longitude": 10,
  "dateCreated": "2015-10-21T03:55:06.000Z",
  "dateModified":"2015-10-23T01:15:43.000Z",
  "caption": "new caption"
}`}</code></pre>

          <h4>Delete a pin</h4>
          <code>{`DELETE /pins/{pinId}`}</code>
          <pre className="docs-example">{`curl -X DELETE ${apiUri}/pins/90`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h4>Log a pin visit</h4>
          <code>{`PUT /pins/{pinId}/visits/{userId}`}</code>
          <pre className="docs-example">{`curl -X PUT ${apiUri}/pins/90/visits/1`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h4>Get a pin's visits</h4>
          <code>{`GET /pins/{pinId}/visits`}</code>
          <pre className="docs-example">{`curl ${apiUri}/pins/90/visits`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
[
  {
    userId: 188,
    pinId: 188,
    dateCreated: '2015-11-03T00:49:13.000Z'
  }
]
`}</code></pre>

          <h4>Flag a pin</h4>
          <code>{`PUT /pins/{pinId}/flags/{userId}`}</code>
          <pre className="docs-example">{`curl -X PUT ${apiUri}/pins/90/flags/1`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h4>Un-flag a pin</h4>
          <code>{`DELETE /pins/{pinId}/flags/{userId}`}</code>
          <pre className="docs-example">{`curl -X DELETE ${apiUri}/pins/90/flags/1`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h4>Tag a pin</h4>
          <code>{`PUT /pins/{pinId}/tags/{tagId}`}</code>
          <pre className="docs-example">{`curl -X PUT ${apiUri}/pins/90/tags/1`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h4>Un-tag a pin</h4>
          <code>{`DELETE /pins/{pinId}/tags/{tagId}`}</code>
          <pre className="docs-example">{`curl -X DELETE ${apiUri}/pins/90/tags/1`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h4>Get pin descriptions</h4>
          <code>{`GET /pins/{pinId}/descriptions`}</code>
          <pre className="docs-example">{`curl ${apiUri}/pins/90/descriptions`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
[
  {
    "descriptionId":14,
    "userId":1,
    "pinId":30,
    "text":"test description",
    "dateCreated":"2015-10-23T01:34:21.000Z",
    "dateModified":"2015-10-23T01:34:21.000Z"
  }
]
`}</code></pre>

          <h4>Get pin tags</h4>
          <code>{`GET /pins/{pinId}/tags`}</code>
          <pre className="docs-example">{`curl ${apiUri}/pins/30/tags`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
[
  {
    "tagId":38,
    "name":"Test Tag",
    "dateCreated":"2015-10-23T02:28:10.000Z",
    "dateModified":"2015-10-23T02:28:10.000Z"
  }
]
`}</code></pre>

          <h4>Get pin images</h4>
          <code>{`GET /pins/{pinId}/images`}</code>
          <pre className="docs-example">{`curl ${apiUri}/pins/90/images`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
[
  {
    "imageId":6,
    "userId":47,
    "pinId":30,
    "dateCreated":"2015-10-23T02:09:42.000Z",
    "dateModified":"2015-10-23T02:09:42.000Z"
  },
  {
    "imageId":7,
    "userId":47,
    "pinId":30,
    "dateCreated":"2015-10-23T02:11:11.000Z",
    "dateModified":"2015-10-23T02:11:11.000Z"
  }
]
`}</code></pre>

          <h3 id="api-descriptions">Descriptions</h3>

          <h4>Create a new description</h4>
          <code>{`POST /descriptions`}</code>
          <pre className="docs-example">{`curl -X POST ${apiUri}/descriptions
{
  "userId": 1,
  "pinId": 30,
  "text": "test description"
}
`}
          </pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "descriptionId":14,
  "userId":1,
  "pinId":30,
  "text":"test description",
  "dateCreated":"2015-10-23T01:34:21.000Z",
  "dateModified":"2015-10-23T01:34:21.000Z"
}`}</code></pre>

          <h4>Retrieve an existing description</h4>
          <code>{`GET /descriptions/{descriptionId}`}</code>
          <pre className="docs-example">{`curl ${apiUri}/descriptions/14`}</pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "descriptionId":14,
  "userId":1,
  "pinId":30,
  "text":"test description",
  "dateCreated":"2015-10-23T01:34:21.000Z",
  "dateModified":"2015-10-23T01:34:21.000Z"
}`}</code></pre>

          <h4>Update an existing description</h4>
          <code>{`PUT /descriptions/{descriptionId}`}</code>
          <pre className="docs-example">{`curl -X PUT ${apiUri}/descriptions/14
{
  "descriptionId",
  "text":"new description"
}
`}</pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "descriptionId":14,
  "userId":1,
  "pinId":30,
  "text":"test description",
  "dateCreated":"2015-10-23T01:34:21.000Z",
  "dateModified":"2015-10-23T01:41:27.000Z"
}`}</code></pre>

          <h4>Delete a description</h4>
          <code>{`DELETE /descriptions/{descriptionId}`}</code>
          <pre className="docs-example">{`curl -X DELETE ${apiUri}/descriptions/14`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h3 id="api-images">Images</h3>

          <h4>Create a new image</h4>
          <code>{`POST /images`}</code>
          <pre className="docs-example">{`curl -F "file=@test.jpg" -F "userId=47" -F "pinId=30" ${apiUri}/images
`}
          </pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "imageId":9,
  "userId":47,
  "pinId":30,
  "dateCreated":"2015-10-23T02:11:53.000Z",
  "dateModified":"2015-10-23T02:11:53.000Z"
}
`}</code></pre>

          <h4>Retrieve an existing image</h4>
          <code>{`GET /images/{imageId}`}</code>
          <pre className="docs-example">{`curl ${apiUri}/images/9`}</pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "imageId":9,
  "userId":47,
  "pinId":30,
  "dateCreated":"2015-10-23T02:11:53.000Z",
  "dateModified":"2015-10-23T02:11:53.000Z"
}`}</code></pre>

          <h4>Delete an image</h4>
          <code>{`DELETE /images/{imageId}`}</code>
          <pre className="docs-example">{`curl -X DELETE ${apiUri}/images/14`}</pre>
          <pre className="prettyprint"><code className="javascript">{`204 No Content`}</code></pre>

          <h3 id="api-imagesizes">Image Sizes</h3>
          <h4>Get image sizes</h4>
          <code>{`GET /imagesizes`}</code>
          <pre className="docs-example">{`curl ${apiUri}/imagesizes`}</pre>
          <pre className="prettyprint"><code className="javascript">{`200 OK
[
  {
    "imageSizeId": 1,
    "name": "square",
    "height": 60,
    "width": 60
  },
  {
    "imageSizeId": 2,
    "name": "tiny",
    "height": 0,
    "width": 32
  },
  {
    "imageSizeId": 3,
    "name": "thumbnail",
    "height": 0,
    "width": 100
  },
  {
    "imageSizeId": 4,
    "name": "small",
    "height": 0,
    "width": 240
  },
  {
    "imageSizeId": 5,
    "name": "medium",
    "height": 0,
    "width": 500
  },
  {
    "imageSizeId": 6,
    "name": "large",
    "height": 0,
    "width": 600
  }
]
`}</code></pre>

          <h3 id="api-tags">Tags</h3>

          <h4>Create a tag</h4>
          <p><code>POST /tags</code></p>
          <pre className="docs-example">{`curl -X POST ${apiUri}/tags
{
  "name": "Test Tag",
}
`}
          </pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "tagId":38,
  "name":"Test Tag",
  "dateCreated":"2015-10-23T02:28:10.000Z",
  "dateModified":"2015-10-23T02:28:10.000Z"
}`}</code></pre>

          <h4>Retrieve an existing tag</h4>
          <p><code>{`GET /tags/{tagId}`}</code></p>
          <pre className="docs-example">{`curl ${apiUri}/tags/38`}</pre>
          <pre className="prettyprint"><code className="javascript">{`201 Created
{
  "tagId":38,
  "name":"Test Tag",
  "dateCreated":"2015-10-23T02:28:10.000Z",
  "dateModified":"2015-10-23T02:28:10.000Z"
}`}</code></pre>
        </div>
      </div>
    )
  }
}

export default DocPage;
