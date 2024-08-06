# Backend Instructions/Walkthrough

## 1. Hosting Via Docker
This will serve as a manual for the dev team to host the project's server/backend securely through docker for testing purposes

---
- ### 1.1. Install Docker for desktop from the web

- ### 1.2. Open Docker and your terminal in the \backend\ directory

- # NOTE: THERE ARE 2 WAYS TO RUN THE CONTAINER, SEE EITHER 1.3.1 OR 1.3.3 <--- (recommended)

- ### 1.3 Run the following command in your terminal to build the docker image and run it

docker-compose up --build

- ### 1.4. For debugging, run the following command with the docker image id grabbed from the running instance found in the docker desktop application

docker logs <container_id>

This command will outline anything going awry with the docker hosting service. This is expecially helpful if the container is closing just after starting up, as the log often details why the container shut down.

- ### 1.5. Clean up the docker images, run the following commands before rebuilding

docker-compose down --volumes
docker system prune --all --volumes --force
---

## Important Tips

- When modifying the backend, you MUST rebuild the docker image with the command from 1.3. (see above). Without it the old build will persist
- After rebuilding or even rehosting the same docker image, a new running image instance will appear in the Docker desktop app. The old one will not be deleted however so for good practice to keep a clean workspace, aim to delete the old exited verions as they become depracated
- With the prior bullet in mind, you can relaunch existing image instances if they are still up to date from the Docker desktop app which saves the need to create a new instance (and thus delete an old one).