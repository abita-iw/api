export default {
  description: ['descriptionId', 'userId', 'pinId', 'text', 'dateCreated', 'dateModified'],
  image: ['imageId', 'userId', 'pinId', 'dateCreated', 'dateModified'],
  imageUrl: ['imageId', 'imageSizeId', 'url'],
  imageSize: ['imageSizeId', 'name', 'height', 'width'],
  user: ['userId', 'email', 'dateCreated', 'dateModified'],
  star: ['userId', 'pinId', 'dateCreated'],
  userVisitation: ['userId', 'pinId'],
  flag: ['userId', 'pinId', 'dateCreated'],
  pinType: ['pinTypeId', 'name'],
  tag: ['tagId', 'name', 'dateCreated', 'dateModified'],
  pinTag: ['pinId', 'tagId'],
  pinVisitation: ['pinVisitationId', 'pinId', 'createdDate'],
  pin: ['pinId', 'userId', 'pinType', 'latitude', 'longitude', 'dateCreated', 'dateModified', 'caption']
};
