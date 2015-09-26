export default {
  image: ['imageId', 'userId', 'pinId', 'dateCreated', 'dateModified'],
  imageUrl: ['imageId', 'imageSizeId', 'url'],
  imageSize: ['imageSizeId', 'name', 'height', 'width'],
  user: ['userId', 'email', 'dateCreated', 'dateModified', 'isDeleted'],
  star: ['userId', 'pinId', 'dateCreated', 'isDeleted'],
  userVisitation: ['userId', 'pinId'],
  flag: ['userId', 'pinId', 'dateCreated'],
  pinType: ['pinTypeId', 'name'],
  tag: ['tagId', 'name', 'dateCreated', 'dateModified'],
  pinTag: ['pinId', 'tagId'],
  pinVisitation: ['pinVisitationId', 'pinId', 'createdDate'],
  pin: ['pinId', 'userId', 'typeId', 'latitude', 'longitude', 'dateCreated', 'dateModified', 'isDeleted', 'description', 'caption']
};
