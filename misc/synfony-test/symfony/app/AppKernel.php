<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

/**
 * import external or your own Bundles
 */
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new JMS\AopBundle\JMSAopBundle(),
            new JMS\DiExtraBundle\JMSDiExtraBundle($this),
            new JMS\SecurityExtraBundle\JMSSecurityExtraBundle(),

			// Bundles for User administration and generate CRUD views for entities
            new \FOS\UserBundle\FOSUserBundle(),
            new Sonata\UserBundle\SonataUserBundle(),
	        new Sonata\AdminBundle\SonataAdminBundle(),
	        new Sonata\DoctrineORMAdminBundle\SonataDoctrineORMAdminBundle(),
	        new Knp\Bundle\MenuBundle\KnpMenuBundle(),
            new Sonata\BlockBundle\SonataBlockBundle(),
	        new Sonata\CacheBundle\SonataCacheBundle(),
	        new Sonata\jQueryBundle\SonatajQueryBundle(),
	        
	        // generate JSON from entity and  vice versa
            new JMS\SerializerBundle\JMSSerializerBundle(),
            
			// MoPad Bundle
            new MoPad\AdminBundle\MoPadAdminBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
