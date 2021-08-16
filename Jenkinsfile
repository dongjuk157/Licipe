pipeline {
	agent none
	tools {nodejs 'nodejs'}
	stages {
		stage('Build') {
			agent {
				docker {
					image 'node:12-alpine'
				}
			}
			steps {
				dir ('frontend') {
					echo 'REACT_APP_API_URL = http://localhost/\nREACT_APP_API_PORT = 8080\nREACT_APP_KAKAO_REST_API_KEY = 0d4240c77e9221fb9d99142127676902\nREACT_APP_KAKAO_REDIRECT_URI = http://localhost:3000/oauth/callback/kakao\nREACT_APP_AWS_IDENTITY_POOL_ID = ap-northeast-2:0e8878ad-e2d9-4d26-ba4d-d45f545a16d4\nREACT_APP_AWS_S3_BUCKET = b206\nREACT_APP_AWS_REGION = ap-northeast-2 > .env'
					sh 'rm -f package-lock.json'
					sh 'yarn install'
					sh 'yarn build'
				}
			}
		}
		stage('Docker build') {
			agent any
			steps {
				dir ('frontend') {
					sh 'docker build -t licipe:front .'
				}
			}
		}
		stage ('Docker run') {
			agent any
			steps {
				dir ('frontend') {
					sh 'docker ps -f name=licipe -q | xargs --no-run-if-empty docker container stop'
					sh 'docker container ls -a -fname=licipe -q | xargs -r docker container rm'
					sh 'docker run -d --name licipe -p 80:80 licipe:front'
				}
			}
		}
	}
	post {
		success {
			echo 'i am here'
		}
	}
}
