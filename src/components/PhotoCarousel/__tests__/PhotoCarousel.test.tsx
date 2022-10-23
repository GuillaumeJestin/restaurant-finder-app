import { render, screen } from '@testing-library/react';
import getPhotoUrl from '../../../services/getPhotoUrl';
import PhotoCarousel from '../PhotoCarousel';

const mockedPhotoData = [
  {
    "id": "5f953c7e4d41aa4d78b51442",
    "created_at": "2020-10-25T08:51:10.000Z",
    "prefix": "https://fastly.4sqi.net/img/general/",
    "suffix": "/27261341_O0vK7LZw_eet_8Bln16ryVkwDsMzSJlvB8nXY4HtwAA.jpg",
    "width": 1440,
    "height": 1440
  },
  {
    "id": "56630470498edf507bdcf9e3",
    "created_at": "2015-12-05T15:36:16.000Z",
    "prefix": "https://fastly.4sqi.net/img/general/",
    "suffix": "/6241932_0C9BRJlNZJGFVIaAUoe-hXYgkljWTqcCnpQiCxArhYo.jpg",
    "width": 1920,
    "height": 1440,
    "classifications": [
      "outdoor"
    ]
  },
  {
    "id": "52063fdf11d22721f345ea11",
    "created_at": "2013-08-10T13:27:59.000Z",
    "prefix": "https://fastly.4sqi.net/img/general/",
    "suffix": "/1032975_9V0Uibpb9i6DdiLfubx59Umi4kJy7iOQ7D1cl5PuVwc.jpg",
    "width": 717,
    "height": 959
  }
]

describe("<PhotoCarousel />", () => {

  test("All Photos are displayed", () => {
    render(<PhotoCarousel photos={mockedPhotoData} />);
    const allImages = document.querySelectorAll("img");

    expect(allImages.length).toBe(mockedPhotoData.length);

    for (let index = 0; index < allImages.length; index++) {
      const img = allImages[index];
      const expectedSrc = getPhotoUrl(mockedPhotoData[index]);

      expect(img.src).toBe(expectedSrc);
    }

  });

  test("Counter display", () => {
    render(<PhotoCarousel photos={mockedPhotoData} />);

    const counterElement = screen.getByText("1 / 3");
    expect(counterElement).toBeInTheDocument();
  });
});