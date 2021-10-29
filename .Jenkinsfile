pipeline {

    agent any

    environment {
        CI = 'true'
    }
    
    stages {
        stage('Build') {
            steps {
                sh label: "Installing packages...", script: 'npm ci --prefer-offline'
                sh label: "Building...", script: 'npm run build'
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
