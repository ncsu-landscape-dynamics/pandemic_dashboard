# Contributing to Pandemic Dashboard development from outside of core development team

The goal of this guide is to help you get up and contributing to Pandemic Dashboard as quickly as possible. The guide is divided into two main pieces:

1. Filing a bug report or feature request in an issue.
1. Suggesting a change via a pull request.

Please note that Pandemic Dashboard is released with a [Contributor Code of Conduct](contributing_docs/CODE_OF_CONDUCT.md). By contributing to this project, 
you agree to abide by its terms.

## Issues

When filing an issue, the most important thing is to include a minimal 
reproducible example so that we can quickly verify the problem, and then figure 
out how to fix it. There are three things you need to include to make your 
example reproducible: required packages, data, code.
  
1.  The easiest way to include **data** is to include a link to a google drive folder containing your model output and 
  
1.  Spend a little bit of time ensuring that your **code** is easy for others to
    read:
  
    * make sure you've used spaces and your variable names are concise, but
      informative
  
    * use comments to indicate where your problem lies
  
    * do your best to remove everything that is not related to the problem.  
     The shorter your code is, the easier it is to understand.

## Pull 

To contribute a change to Pandemic Dashboard, follow these steps:

1. Create a branch in git and make your changes.
1. Push branch to github and issue pull request (PR) if new feature add to a feature/new_feature branch.
1. Discuss the pull request.
1. Iterate until either we accept the PR or decide that it's not
   a good fit for Pandemic Dashboard.

Each of these steps are described in more detail below. This might feel 
overwhelming the first time you get set up, but it gets easier with practice. 


Pull requests will be evaluated against a three point checklist:

1.  __Motivation__. Your pull request should clearly and concisely motivate the
    need for change. 


1.  __Only related changes__. Before you submit your pull request, please
    check to make sure that you haven't accidentally included any unrelated
    changes. These make it harder to see exactly what's changed, and to
    evaluate any unexpected side effects.

    Each PR corresponds to a git branch, so if you expect to submit
    multiple changes make sure to create multiple branches. If you have
    multiple changes that depend on each other, start with the first one
    and don't submit any others until the first one has been processed.

1.  __Use Pandemic coding style__. Please follow the
    [Pandemic Dashboard style guide](contributing_docs/STYLE_GUIDE.md). Maintaining
    a consistent style across the whole code base makes it much easier to
    jump into the code. If you're modifying existing Pandemic dashboard code that
    doesn't follow the style guide, a separate pull request to fix the
    style would be greatly appreciated.


This seems like a lot of work but don't worry if your pull request isn't perfect.
It's a learning process and members of the Pandemic team will be on hand to help you
out. A pull request ("PR") is a process, and unless you've submitted a few in the
past it's unlikely that your pull request will be accepted as is. All PRs require
review and approval from at least one member of the Pandemics Dashboard development team 
before merge.

Finally, remember that the Pandemic Dashboard is funded by USDA APHIS and maintained by the
NCSU Center for Geospatial Analytics. This means that changes that dramatically 
alter the way the model and interface works will be maintained in a feature/branch for use by
others but may not be moved immediately/ever into the master branch because
multiple tools use that branch and need to be updated if major functional changes
occur in the Master branch.