import type { Content, User, ENV } from "../../utils/types/data-types";
import {
  fakeGetUser,
  //  fakePostProject,
} from "./stand-alone-data/fakeContentServices";

export class DataContent {
  public findUser;
  public createProject;
  public createContent;
  public fetchContents;
  public env: ENV;

  constructor() {
    const BE = import.meta.env;
    this.env = BE;
    if (BE["VITE_Back_End_type"] === "fake") {
      this.findUser = fakeGetUser;
      this.createProject = this.postProject;
      this.createContent = DataContent.postContent; //this.fakeContentCreation
      this.fetchContents = DataContent.getContents;
    }
    if (BE["VITE_Back_End_type"] === "local") {
      this.findUser = this.fetchUser;
      this.createProject = this.postProject;
      this.createContent = DataContent.postContent;
      this.fetchContents = DataContent.getContents;
    } else {
      this.findUser = fakeGetUser;
      this.createProject = this.postProject;
      this.createContent = DataContent.postContent;
      this.fetchContents = DataContent.getContents;
    }
  }

  static async getContents(projectId: string): Promise<Content[] | null> {
    const url = `/api/content/project?projectId=${projectId}`;
    const request = new Request(url);
    try {
      const rawContent = await fetch(request);
      if (rawContent.status === 200) {
        const parsedContent = await rawContent.json();
        if (parsedContent.length > 0) {
          return parsedContent;
        }
      }
      if (rawContent.status === 303) {
        const message = await rawContent.text();
        alert(message);
      }
      return null;
    } catch (error) {
      alert(error);
      return null;
    }
  }

  static async postContent(
    content: Content,
    quill: string
  ): Promise<Content | null> {
    const url = "/api/content/project-content";
    const request = new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...content,
        body: quill,
        projectItemId: content.projectId,
        published: "not published",
      }),
    });

    try {
      const rawContent = await fetch(request);
      if (rawContent.status === 200) {
        const parsedContent = await rawContent.json();
        if (parsedContent.id) {
          return parsedContent;
        }
      }
      return null;
    } catch (error) {
      alert(error);
      return null;
    }
  }

  static async removeContent(contentId: string) {
    const url = "/api/content/project-content";
    const request = new Request(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contentId }),
    });
    try {
      const rawProject = await fetch(request);
      if (rawProject.status === 200) {
        const project = await rawProject.json();
        return project;
      } else {
        return null;
      }
    } catch (error) {
      alert(error);
      console.log(error);
      return null;
    }
  }

  async postProject(
    projectName: string,
    contentType: string,
    accountId: string
  ) {
    const url = "/api/content/new-project";
    const request = new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId,
        name: projectName,
        contentType,
      }),
    });

    try {
      const rawProject = await fetch(request);
      if (rawProject.status === 200) {
        const project = await rawProject.json();
        return project;
      } else {
        return null;
      }
    } catch (error) {
      alert(error);
      console.log(error);
      return null;
    }
  }

  async fetchUser(accId: string): Promise<User | null> {
    const shortUrl = `/api/content/ui-profile?accountId=${accId}`;
    const request = new Request(shortUrl);
    try {
      const rawUser = await fetch(request, {
        credentials: "include",
      });
      if (rawUser.status === 200) {
        const user: User = await rawUser.json();
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async uploadTosS3(file: File): Promise<string> {
    const shortUrl = "/content/presigned-S3-url";
    const res = await fetch(shortUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    });
    const { url } = await res.json();
    // Step 2: Upload file directly to S3
    await fetch(url, {
      method: "PUT",
      body: file,
    });
    return url;
  }

  static async publishContent(id: string, published = '') {
    const shortUrl = "/api/content/project-content";
    try {
      const res = await fetch(shortUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          id,
          published
        }),
      });
      return res;
    } catch (error) {
      alert(error);
      return null;
    }
  }
}
