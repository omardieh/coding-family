import "./index.css";
import { TutorialCreate } from "./TutorialCreate.page";
import { TutorialDetails } from "./TutorialDetails.page";
import { TutorialEdit } from "./TutorialEdit.page";
import { TutorialsList } from "./TutorialsList.page";
import { TutorialTagDetails } from "./TutorialTagDetails.page";
import { TutorialTagsList } from "./TutorialTagsList.page";

export default [
  {
    path: "/tutorials",
    element: <TutorialsList />,
    children: [
      {
        path: "/tutorials/:slug",
        element: <TutorialDetails />,
        children: [
          {
            path: "/tutorials/:slug/edit",
            element: <TutorialEdit />,
            scope: "user",
          },
        ],
      },
      {
        path: "/tutorials/create",
        element: <TutorialCreate />,
        scope: "user",
      },
      {
        path: "/tutorials/tags",
        element: <TutorialTagsList />,
        children: [
          {
            path: "/tutorials/tags/:slug",
            element: <TutorialTagDetails />,
          },
        ],
      },
    ],
  },
];
