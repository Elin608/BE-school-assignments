# Week 12 - GitHub Actions
## Exercise 1
** What does on do?**
It tells GitHub when to start the workflow.
** What does runs-on do?**
It tells GitHub where to run the job.
** What does strategy.matrix do?**
It runs tests with different Node.js versions. 
** What does steps do?**
It tells GitHub what to do, step by step. 
** Why did nothing happen when you only pushed the branch?
The workflow file was not added. 

## Exercise 2
** How many jobs ran and why?
Two jobs because I used Node.js 22 and 24. 
** Why can testes pass locally but fail in CI?**
Because the Node.js versions can be different. 

## Exercise 3
** Why is a red cross on a pull request better than one after merging?
So we can find and fix errors before merging the code. 
