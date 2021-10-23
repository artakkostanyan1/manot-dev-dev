pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh "npm install"
                sh "npm run build"
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                withCredentials([sshUserPrivateKey(credentialsId: "worker-key", keyFileVariable: 'workerkey')]) {
                    sh '''ssh -i ${workerkey} -o StrictHostKeyChecking=no ubuntu@3.238.39.84 sudo rm -rf /var/www/dev-manot-ui/* /home/ubuntu/www/dev-manot-ui/* || true ;
                        scp -i ${workerkey} -r ${WORKSPACE}/build/* ubuntu@3.238.39.84:/home/ubuntu/www/dev-manot-ui/ ;
                        ssh -i ${workerkey} -o StrictHostKeyChecking=no ubuntu@3.238.39.84 sudo cp -r /home/ubuntu/www/dev-manot-ui/* /var/www/dev-manot-ui/ '''
                }
            }
        }
    }
}
