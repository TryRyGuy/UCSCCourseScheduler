# Backend Instructions/Walkthrough

## 1. Hosting Via Docker
This will serve as a manual for the dev team to host the project's server/backend securely through docker for testing purposes

---
- ### 1.1. Install Docker for desktop from the web

- ### 1.2. Open Docker and your terminal in the \backend\ directory

- ### 1.3. Run the following command in your terminal to build the docker image. (Note the name can be changed but to keep it uniform when discussing in meetings try to use the one provided below)

'''docker build -t ucsc-sched-srvc-backend .'''

- ### 1.4. Run the following command in your terminal to run the docker image

'''docker run -p 5000:5000 ucsc-sched-srvc-backend'''

- ### 1.5. For debugging, run the following command with the docker image id grabbed from the running instance found in the docker desktop application

'''docker logs <container_id>'''

This command will outline anything going awry with the docker hosting service. This is expecially helpful if the container is closing just after starting up, as the log often details why the container shut down.

- ### 1.6. To exit/close the docker image, run the following command with either the docker image name or ID

'''docker stop <container_id>'''

---

## Important Tips

- When modifying the backend, you MUST rebuild the docker image with the command from 1.3. (see above). Without it the old build will persist
- After rebuilding or even rehosting the same docker image, a new running image instance will appear in the Docker desktop app. The old one will not be deleted however so for good practice to keep a clean workspace, aim to delete the old exited verions as they become depracated
- With the prior bullet in mind, you can relaunch existing image instances if they are still up to date from the Docker desktop app which saves the need to create a new instance (and thus delete an old one).