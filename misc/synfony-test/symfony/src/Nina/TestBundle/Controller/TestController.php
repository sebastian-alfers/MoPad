<?php

namespace Nina\TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Acme\DemoBundle\Form\ContactType;

// these import the "@Route" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class TestController extends Controller
{
    /**
     * @Route("/blub/{name}", name="_test_blub")
     * @Template()
     */
    public function blubAction($name)
    {
        return array('name' => $name);
    }

}
