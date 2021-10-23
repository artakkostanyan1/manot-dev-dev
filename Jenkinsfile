pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Deploy") {
            steps {
               // sh "sudo rm -rf /var/www/manot-ui"
                scp -r ./build/* jenkins@dev.app.manot.tech:/var/www/dev/manot-ui/
            }
        }
    }
}
