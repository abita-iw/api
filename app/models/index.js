import {
  int,
  required,
  notnull,
  optional,
  alpha,
  email,
  numeric,
  length,
  date,
  float
} from '../models/types';

export default {
  description: [
    {
      name: 'descriptionId',
      validators: [int]
    },
    {
      name: 'userId',
      validators: [int, required, notnull]
    },
    {
      name: 'pinId',
      validators: [int, required, notnull]
    },
    {
      name: 'text',
      validators: [required, length(0, 1000)]
    },
    {
      name: 'dateCreated',
      validators: [date]
    },
    {
      name: 'dateModified',
      validators: [date]
    }
  ],
  image: [
    {
      name: 'imageId',
      validators: [int]
    },
    {
      name: 'userId',
      validators: [int, required, notnull]
    },
    {
      name: 'pinId',
      validators: [int, required, notnull]
    },
    {
      name: 'dateCreated',
      validators: [date]
    },
    {
      name: 'dateModified',
      validators: [date]
    }
  ],
  imageSize: [
    {
      name: 'imageSizeId',
      validators: [int]
    },
    {
      name: 'name',
      validators: [alpha, required, notnull]
    },
    {
      name: 'height',
      validators: [int, required, notnull]
    },
    {
      name: 'width',
      validators: [int, required, notnull]
    }
  ],
  user: [
    {
      name: 'userId',
      validators: [int]
    },
    {
      name: 'email',
      validators: [email, required, notnull]
    },
    {
      name: 'dateCreated',
      validators: [date]
    },
    {
      name: 'dateModified',
      validators: [date]
    }
  ],
  star: [
    {
      name: 'userId',
      validators: [int, required, notnull]
    },
    {
      name: 'pinId',
      validators: [int, required, notnull]
    },
    {
      name: 'dateCreated',
      validators: [date]
    }
  ],
  flag: [
    {
      name: 'userId',
      validators: [int, required, notnull]
    },
    {
      name: 'pinId',
      validators: [int, required, notnull]
    },
    {
      name: 'dateCreated',
      validators: [date]
    }
  ],
  pinType: [
    {
      name: 'pinTypeId',
      validators: [int]
    },
    {
      name: 'name',
      validators: [required, notnull]
    }
  ],
  tag: [
    {
      name: 'tagId',
      validators: [int]
    },
    {
      name: 'name',
      validators: [required, notnull]
    },
    {
      name: 'dateCreated',
      validators: [date]
    },
    {
      name: 'dateModified',
      validators: [date]
    }
  ],
  pinTag: [
    {
      name: 'pinId',
      validators: [int, required, notnull]
    },
    {
      name: 'tagId',
      validators: [int, required, notnull]
    }
  ],
  visitation: [
    {
      name: 'userId',
      validators: [int, required, notnull]
    },
    {
      name: 'pinId',
      validators: [int, required, notnull]
    },
    {
      name: 'dateCreated',
      validators: [date]
    }
  ],
  pin: [
    {
      name: 'pinId',
      validators: [int ]
    },
    {
      name: 'userId',
      validators: [int, required, notnull]
    },
    {
      name: 'pinType',
      validators: [notnull]
    },
    {
      name: 'typeId',
      validators: [notnull]
    },
    {
      name: 'latitude',
      validators: [float, required, notnull]
    },
    {
      name: 'longitude',
      validators: [float, required, notnull]
    },
    {
      name: 'dateCreated',
      validators: [date]
    },
    {
      name: 'dateModified',
      validators: [date]
    },
    {
      name: 'title',
      validators: [length(0,255), required, notnull]
    }
  ],
  link: [
    {
      name: 'linkId',
      validators: [int]
    },
    {
      name: 'pinId',
      validators: [int]
    },
    {
      name: 'link',
      validators: [required, notnull, length(0,255)]
    },
    {
      name: 'dateCreated',
      validators: [date]
    },
    {
      name: 'dateModified',
      validators: [date]
    }
  ]
};

