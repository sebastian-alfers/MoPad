<?php

namespace Nina\TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;

// these import the "@Route" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class TestController extends Controller
{
	/**
     * @Route("/test", name="_test")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
	
    /**
     * @Route("/blub/{name}", name="_test_blub")
     * @Template()
     */
    public function blubAction($name)
    {
        return array('name' => $name);
    }
	
	/**
	 * @Route("/testpage/{name}", name="_test_testpage")
	 * @Template()
	 */
	public function testpageAction($name)
	{
		$this->render('NinaTestBundle:Test:testpage.html.twig', array('name' => $name));
	}
	
	
	public function fancyAction($name, $color)
    {
        // create some object, based on the $color variable
        $object = $color;

        return $this->render('NinaTestBundle:Test:fancy.html.twig', array('name' => $name, 'object' => $object));
    }
}
